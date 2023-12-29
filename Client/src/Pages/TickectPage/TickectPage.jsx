import React from 'react'
import './TickectPage.scss'
import logo from '../../assets/logo.png'
import Navbar from '../../components/Navbar/Navbar'

function TickectPage() {
    return (
        <>
            <Navbar />
            <div className='TickectPage'>
                <div className="TickectPage-left">
                    <h1>TICKECT</h1>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src={logo} alt="Avatar" />
                            </div>
                            <div class="flip-card-back">
                                <img src='' alt=" " />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="TickectPage-right">
                    <h1>RULES</h1>
                    <p>
                        <b>Confirmation Email</b>: Upon ticket issuance, a confirmation email will be sent to the registered Gmail address,
                        providing details of the ticket and event.
                        <br />
                        <br />
                        <b>Access to Event</b>: Possession of the issued ticket is mandatory for participation in the event. The ticket serves as both an entry pass and an identifier during the event.
                        <br />
                        <br />
                        <b>Verification OTP</b>: During the ticket scanning process at the event venue, a one-time verification OTP will be sent to the registered email. This OTP must be provided for validation and entry.
                        <br />
                        <br />
                        <b>Verification Time</b>: The verification OTP will be sent during the ticket scanning process, ensuring secure and authorized access to the event.
                        <br />
                        <br />
                        <b>Ticket Availability</b>: After successful ticket issuance, the ticket will be accessible on the event website and sent to the registered Gmail address. It is expected to be available within approximately 20 hours from the time of issuance.
                    </p>
                </div>
            </div>
        </>
    )
}
export default TickectPage