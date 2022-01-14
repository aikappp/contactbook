import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../CONTEXTS/MainProvider";

const EditPage = () => {
  const value = React.useContext(MainContext);
  const { contactTOEdit } = value;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();

  useEffect(() => {
    //! срабатывает только один раз
    value.getProductToEdit(params.id);
  }, []);
  useEffect(() => {
    if (contactTOEdit) {
      setName(contactTOEdit.name);
      setSurname(contactTOEdit.surname);
      setPhoneNumber(contactTOEdit.phoneNumber);
      setEmail(contactTOEdit.email);
      setImage(contactTOEdit.image);
    }
  }, [contactTOEdit]);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let editedContact = {
      name,
      surname,
      phoneNumber,
      email,
      image,
      id: contactTOEdit.id,
    };
    value.saveEditedContact(editedContact);
    navigate("/");
  };
  if (!contactTOEdit) {
    return <h2>Loading..</h2>;
  }
  return (
    <div className="container edit-add-page">
      <h2>Edit Page</h2>
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
          placeholder="Enter number"
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
        <Button type="Submit">Save changes</Button>
      </form>
    </div>
  );
};

export default EditPage;
