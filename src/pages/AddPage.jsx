import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../CONTEXTS/MainProvider";

const AddPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  //! чтобы перенаправлять пользователя
  const navigate = useNavigate();

  //! получаем данные с контекста
  const value = React.useContext(MainContext);
  //! создаем функцию
  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      name,
      surname,
      phoneNumber,
      email,
      image,
    };
    value.addContact(newContact);
    setName("");
    setSurname("");
    setPhoneNumber("");
    setEmail("");
    setImage("");
    //! перенаправляем
    //! -1 назад на одну стрвницу
    //! +1 вперед на одну страницу
    navigate("/");
  };
  return (
    <div className="container edit-add-page">
      <h2>Add Page</h2>
      <form onSubmit={handleSubmit}>
        <FormControl
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter name"
        />
        <FormControl
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
          type="text"
          placeholder="Enter surname"
        />
        <FormControl
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          type="text"
          placeholder="Enter phone number"
        />
        <FormControl
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter your email"
        />
        <FormControl
          onChange={(e) => setImage(e.target.value)}
          value={image}
          src="URL"
        />

        <Button type="submit">add</Button>
      </form>
    </div>
  );
};

export default AddPage;
