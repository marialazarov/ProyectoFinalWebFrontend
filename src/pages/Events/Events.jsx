import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bringAllEvents } from "../../services/apicall";
import EventCard from "../../components/EventCard/EventCard";
import './Events.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { Icon } from "@iconify/react";

export const Events = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(5); // Define el número de eventos por página
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar/ocultar la alerta
    const navigate = useNavigate();

    useEffect(() => {
        if (events.length === 0) {
            bringAllEvents().then((eventsData) => {
                setEvents(eventsData); // Asumiendo que los eventos están en un array directamente
            }).catch(error => console.error("Error al traer los eventos:", error));
        }
    }, [events]);

    const showAlertAndRedirect = (eventId, eventData) => {
        setShowAlert(true); // Muestra la alerta cuando se hace clic en el evento
        setTimeout(() => {
            setShowAlert(false); // Oculta la alerta después de 6 segundos
            navigate(`/createEvent/${eventId}`, { state: { eventData } }); // Redirige a la página de creación de eventos con los datos del evento
        }, 6000);
    };

    // Calcula el índice del último evento en la página actual
    const indexOfLastEvent = currentPage * eventsPerPage;
    // Calcula el índice del primer evento en la página actual
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    // Obtiene los eventos de la página actual
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Cambia la página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1 className="titulo"> TODOS LOS EVENTOS PRÓXIMOS</h1>
            <div className="events">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
                        <div key={event.id} className="event-card">
                            <EventCard
                                date={event.date}
                                location={event.location}
                                artist_id={event.artist_id}
                                handler={() => showAlertAndRedirect(event.id, event)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay eventos disponibles.</p>
                )}
            </div>
            <div className="pagination">
                {events.length > 0 && (
                    <div className="buttonContainer">
                        {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
                            <Button key={i + 1} variant="light" className="pagination-button" onClick={() => paginate(i + 1)}>{i + 1}</Button>
                        ))}
                    </div>
                )}
            </div>
            <Modal show={showAlert} onHide={() => setShowAlert(false)} centered>
    <Modal.Body>
        <div className="alert-container"> {/* Nuevo div contenedor */}
            <Alert variant="success">
                <Alert.Heading className="titulo">GRACIAS POR APOYAR EL TALENTO LOCAL</Alert.Heading>
                <p className="texto2">Te redigiremos a un formulario para que puedas rellenar y confirmar tu asistencia al evento</p>
                <hr />
                <img className="loading" src="https://media.tenor.com/JwPW0tw69vAAAAAi/cargando-loading.gif" alt="Gracias" />
            </Alert>
        </div>
    </Modal.Body>
</Modal>

        </div>
    );
};
