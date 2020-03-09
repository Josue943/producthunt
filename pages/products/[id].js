import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase/index";
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";
import Button from "../../components/ui/Button";
import { InputSubmit } from "../../components/ui/Form";
import { css } from "@emotion/core";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import styled from "@emotion/styled";
const Product = () => {
  //state
  const [product, setProduct] = useState({});
  const [addComment, setAddComment] = useState("");
  const [error, setError] = useState(false);
  const [consultDb, setConsultDb] = useState(true);
  const { firebase, user } = useContext(FirebaseContext);
  const router = useRouter();
  //normalmente en next esta pagina viene sin props
  //para poder usarlos hacemos esto
  const {
    query: { id }
  } = router;
  //lo hacemos para sacar los datos
  // ytambien porque aveces esta undefined
  useEffect(() => {
    if (id && consultDb) {
      const getProduct = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        //es una funcion de firebase
        if (product.exists) {
          setProduct(product.data());
          setConsultDb(false);
        } else {
          setError(true);
          setConsultDb(false);
          router.replace("/not-found");
        }
      };
      getProduct();
    }
  }, [id]);

  if (Object.keys(product).length === 0) return "Loading...";

  const {
    comments,
    company,
    created,
    description,
    name,
    url,
    urlImage,
    votes,
    voted,
    creator: { name: username, id: creatorId }
  } = product;

  const onHandleVote = () => {
    if (!user) {
      router.push("/");
    }
    //si lo incluye returnamos
    let newVotes = votes + 1;
    let userVoted = [...voted, user.uid];

    if (voted.includes(user.uid)) return;
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: newVotes, voted: userVoted });
    setProduct({ ...product, votes: newVotes, voted: userVoted });
    setConsultDb(true);
  };

  //save comment
  const onHandleSubmit = e => {
    e.preventDefault();
    const Comment = {
      comment: addComment,
      userId: user.uid,
      name: user.displayName
    };

    const newComments = [...comments, Comment];
    //update db
    firebase.db
      .collection("products")
      .doc(id)
      .update({
        comments: newComments
      });

    //state update
    setProduct({ ...product, comments: newComments });
    setAddComment("");
    setConsultDb(true);
  };
  //funcion para saber si es el creador
  const isCreator = id => {
    if (creatorId === id) return true;
  };

  const canDelete = () => {
    if (!user) return false;
    if (creatorId === user.uid) return true;
  };

  const deleteProduct = async () => {
    //POR SI NO ESTA AUTENTIFICADO
    if (!user) return router.push("/login");
    if (creatorId !== user.uid) return router.push("/");
    try {
      //asi lo borramos
      await firebase.db
        .collection("products")
        .doc(id)
        .delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <>
        {error ? (
          <Error404 message="Product Doesn't Found" />
        ) : (
          <>
            <div className="container">
              <h1
                css={css`
                  text-align: center;
                `}
              >
                {name}
              </h1>
              <div
                css={css`
                  display: flex;
                  flex-flow: wrap row;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    flex-basis: 65%;
                  `}
                >
                  <span
                    css={css`
                      font-size: 1.6rem;
                    `}
                  >
                    Posted {formatDistanceToNow(new Date(created))} ago
                  </span>
                  <br />
                  <span>By {username} </span>

                  <img
                    src={urlImage}
                    css={css`
                      margin-top: 20px;
                    `}
                  />

                  <p
                    css={css`
                      margin: 20px 0;
                      font-size: 1.5rem;
                      font-family: "Roboto Slab", sans-serif;
                    `}
                  >
                    {description}
                  </p>
                  <div>
                    {user && (
                      <>
                        <h2>Add a comment</h2>
                        <form onSubmit={onHandleSubmit}>
                          <div>
                            <input
                              css={css`
                                padding: 0.5rem;
                                width: 100%;
                                margin: 10px 0;
                              `}
                              name="addComment"
                              value={addComment}
                              onChange={e => setAddComment(e.target.value)}
                            />
                          </div>
                          <InputSubmit value="Add commentary" type="submit" />
                        </form>
                      </>
                    )}
                    <h2
                      css={css`
                        margin: 10px 0;
                      `}
                    >
                      Commentaries
                    </h2>

                    {comments.length ? (
                      /*para que el id del usuario sea unico*/

                      <>
                        <ul>
                          {comments.map((c, i) => (
                            <li
                              css={css`
                                list-style: none;
                                margin-bottom: 10px;
                              `}
                              key={`${c.userId}-${i}`}
                            >
                              <p>{c.comment}</p>
                              <p
                                css={css`
                                  color: black;
                                `}
                              >
                                Wrote by <strong> {c.name}</strong>
                              </p>
                              {/*saber si es el creador*/}
                              {isCreator(c.userId) && (
                                <Creator>Is creator</Creator>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <span>No comments</span>
                    )}
                  </div>
                </div>
                <aside
                  css={css`
                    flex-basis: 28%;
                    display: flex;
                    flex-flow: wrap column;
                  `}
                >
                  <Button bgColor="true" target="_blank" href={url}>
                    Visit URL
                  </Button>
                  <span
                    css={css`
                      text-align: center;
                      margin: 15px;
                    `}
                  >
                    {votes} votes
                  </span>
                  {user && <Button onClick={onHandleVote}>Vote</Button>}
                </aside>
                {canDelete() && (
                  <Button onClick={deleteProduct}>Delete Product</Button>
                )}
              </div>
            </div>
          </>
        )}
      </>
    </Layout>
  );
};

const Creator = styled.p`
  padding: 0.5rem 2rem;
  background: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

export default Product;
