
/* Request kommer in
       ↓
  [ Middleware ]  ← kollar token, är du inloggad?
       ↓
  Ja → fortsätt till routen
  Nej → skicka tillbaka 401 Unauthorized */

  import jwt from 'jsonwebtoken';

  const authenticate = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(400).json({ message: "No token"});
    }

    try{ 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
    } catch (err) {
     return res.status(401).json({ message: "invalid token"})
    }
  }

  export default authenticate;