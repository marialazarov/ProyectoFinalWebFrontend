import { useEffect, useState } from "react";
import './Home.css'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData1 } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/apicall";
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';
import { Icon } from "@iconify/react";
import './Home.css'




//VISTA login
export const Home = () => {
    const [artists, setArtists] = useState([]);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    //instancia redux en modo escritura
    const dispatch = useDispatch()

    //instancia redux en modo lectura
    const userRdxData = useSelector(userData1)

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const navigate = useNavigate()

    const buttonHandler = () => {
        userLogin(userData).then((token) => {
            const decodedtoken = jwtDecode(token)
            const data = {
                token: token,
                userData: decodedtoken
            }
            dispatch(login(data))
            navigate('/profile')
        })
            .catch((err) => console.error('ha ocurrido un error', err))
    };


    useEffect(() => {

    }, [artists]);

    useEffect(() => {
    }, [userData]);

    return (
        <>
            <div className="centrar">
                <h1 className="welcome">TALENTO LOCAL</h1>

                <p> Registrate o entra
                    para sumergirte en el talento
                    de la ciudad.
                </p>
            </div>
            <div className="midiv">

                <Form>
                    <div className="midiv">
                        <Form.Group className="mb-3" controlId="formGroupEmail">

                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={userData.email}
                                onChange={inputHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">

                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={userData.password}
                                onChange={inputHandler}
                            />
                        </Form.Group>

                        <Button className="botonmicro" variant="light" onClick={buttonHandler}>
                            <Icon icon="icon-park-solid:entertainment" />

                        </Button>
                    </div>
                </Form>


            </div>
        </>
    );
};
