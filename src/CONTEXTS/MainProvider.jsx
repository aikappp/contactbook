import React, { useReducer } from "react";
import axios from "axios";
import { API } from "../helpers/const";
import { toast } from "react-toastify";

export const MainContext = React.createContext();
const INIT_STATE = {
  contacts: null,
  contactToEdit: null,
};
//! в dispatch передаем action, dispatch за собой вызывает функцию reducer  и передаем первым аргументом state, вторым action

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "GET_PRODUCT_TO_EDIT":
      return { ...state, contactToEdit: action.payload };
    default:
      return state;
  }
};
const MainProvider = (props) => {
  //! создаем состояние(общее)
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  console.log(state);

  const getContacts = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_CONTACTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  //! отправка данных на сервер
  const addContact = async (newContact) => {
    try {
      await axios.post(API, newContact);
      toast.success("Successfully added!");
    } catch (error) {
      console.log(error);
    }
  };

  //! Удаление данных с сервера
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      //! чтобы получить обнавленные данные
      getContacts();
      toast.success("Successfully deleted!");
    } catch (error) {
      toast.error("Error!");
      console.log(error);
    }
  };
  //! Edit
  //! 1 часть - чтобы стянуть данные и подставить в инпуты
  const getProductToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`); //! чтобы получить что то с сервера
      let action = {
        type: "GET_PRODUCT_TO_EDIT",
        payload: response.data,
      };
      console.log(action);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  //! 2 часть - сохраняем изменения
  const saveEditedContact = async (editedContact) => {
    try {
      await axios.patch(`${API}/${editedContact.id}`, editedContact);
      getContacts();
      toast.success("Successfully added!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <MainContext.Provider
        value={{
          addContact,
          getContacts,
          deleteContact,
          getProductToEdit,
          saveEditedContact,
          contacts: state.contacts,
          contactTOEdit: state.contactToEdit,
        }}
      >
        {props.children}
      </MainContext.Provider>
    </div>
  );
};

export default MainProvider;
