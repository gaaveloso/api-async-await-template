import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ButtonNome,
  DeleteButton,
  ButtonContainer,
  MainContainer,
  InputContainer,
  SaveButton,
  CloseButton,
} from "./style";
import { AiOutlineDelete } from "react-icons/ai";
import { Input } from "../../Appstyle";

export const EditarUsuario = (props) => {
  const [usuario, setUsuario] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [editar, setEditar] = useState(false);

  const getDadosUsuario = async () => {
    try {
      const res = await axios.get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`,
        {
          headers: {
            Authorization: "veloso-ammal",
          },
        }
      );
      setUsuario(res.data);
      setEmail(res.data.email);
      setName(res.data.name);
    } catch (error) {
      console.log(error);
    }
    // .then((res) => {
    // })
    // .catch((err) => {
    //   console.log(err.response);
    // });
  };

  useEffect(() => {
    getDadosUsuario();
  }, []);

  const editaUsuario = async () => {
    try {
      const body = {
        name,
        email,
      };
      axios.put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        body,
        {
          headers: {
            Authorization: "veloso-ammal",
          },
        }
      );
      getDadosUsuario();
      setEditar(!editar);
    } catch (error) {
      console.log(error);
    }
  };

  const deletarUsuario = async () => {
    try {
      axios.delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`,
        {
          headers: {
            Authorization: "veloso-ammal",
          },
        }
      );
      alert("usuario removido");
      // chama de novo o get usuarios pra atualizar a lista
      props.getUsuarios();
    } catch (error) {
      console.log(error);
    }
    // .then(() => {
    // })
    // .catch((err) => {
    //   console.log(err.response);
    // });
  };

  return (
    <MainContainer>
      {editar ? (
        <InputContainer>
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SaveButton onClick={editaUsuario}>Salvar</SaveButton>
          <CloseButton onClick={() => setEditar(!editar)}>Fechar</CloseButton>
        </InputContainer>
      ) : (
        <ButtonContainer>
          <ButtonNome onClick={() => setEditar(!editar)}>
            {usuario.name}
          </ButtonNome>
          <DeleteButton onClick={deletarUsuario}>
            <AiOutlineDelete />
          </DeleteButton>
        </ButtonContainer>
      )}
    </MainContainer>
  );
};
