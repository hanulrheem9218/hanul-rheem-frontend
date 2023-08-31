/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
    const form: string | HTMLFormElement | any = useRef();

    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm('service_1dnqwfb', 'template_jjpb20c', form.current, '0qWVv8o9g1RAbo5fG')
            .then((result: any) => {
                console.log(result.text);
                console.log("Message Sent");
                alert("Message Sent");
            }, (error: any) => {
                console.log(error.text);
            });
    };


    return (<><div className="email-section">
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form></div></>)
}

export default Contact;