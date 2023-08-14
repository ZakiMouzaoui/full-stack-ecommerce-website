import { useMutation, useQueryClient } from "react-query";
import NavBarLogin from "../../components/utils/NavBarLogin";
import { useEffect } from "react";
import { insertData } from "../../hooks/useInsertData";
import NotFound404 from "../../components/error/NotFound404";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CheckoutSuccessPage = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    () =>
      insertData("/orders/card-order", {
        sessionId: searchParams.get("session_id"),
      }),
    {
      onSuccess: (res) => {
        queryClient.setQueriesData(["orders"], (oldQuery) => {
          return {
            data: [...oldQuery.data, res.data],
          };
        });
        navigate("/orders", { replace: true });
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div style={{ minHeight: "675px" }}>
      <NavBarLogin></NavBarLogin>
      {isError === true ? (
        <NotFound404></NotFound404>
      ) : isLoading === true ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Spinner className="mb-3"></Spinner>
          <h4>Please be patient while your order is confirmed</h4>
        </div>
      ) : null}
    </div>
  );
};

export default CheckoutSuccessPage;
