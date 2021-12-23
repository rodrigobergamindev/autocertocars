import nodemailer from 'nodemailer'


interface MessageProps {
    name: string;
    whatsapp: string;
    email: string;
}


async function sendMail({name,whatsapp,email} : MessageProps) {
    
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
    }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"AUTO CERTO CARS " <${process.env.EMAIL_USER}>`, // sender address
      to: "autocertomultimarcas@gmail.com", // list of receivers
      subject: "Nova Mensagem - WWW.AUTOCERTOCARS.COM.BR", // Subject line
      html: `<h4>Nova mensagem recebida em www.autocertocars.com.br</h4>

      <p>Ol&aacute; Luiz,</p>
      
      <p>voc&ecirc; recebeu uma nova mensagem de ${name}&nbsp;</p>
      
      <ul>
          <li>Whatsapp: ${whatsapp}&nbsp;</li>
          <li>Email: ${email}</li>
      </ul>
      
      <p>&nbsp;</p>
      
      `, // html body
    });
  
    const send = await info
   
  }

  export {sendMail}