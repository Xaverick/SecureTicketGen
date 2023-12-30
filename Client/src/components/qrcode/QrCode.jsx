import React from "react";
import QRCode from 'qrcode'
import { useState , useEffect} from 'react'
import './QrCode.scss'

const QrCode = ({url}) => {  

	const [qr, setQr] = useState('')

    useEffect(() => {
        QRCode.toDataURL(url, {
            width: 400,
            margin: 2,
            color: {
                dark: '#335383FF',
                light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err)
    
            // console.log(url)
            setQr(url)
            // console.log(qr);
        })
    }, [url])

    
    

    return (

        <div className="qrcode">

            <img src={qr} className="image" alt="your ticket" />
            <a href={qr} download="qrcode.png">Download</a>


        </div>

    )

};

export default QrCode;