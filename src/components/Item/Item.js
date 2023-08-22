import { Link } from 'react-router-dom';
import "./Item.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = ({ item }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <Card className="item-container">
        <Card.Img className='imagen' src={item.img} alt={item.title}/>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>
            {item.level}
          </Card.Text>
          <Link to={"/item/" + item.id}>
            <Button variant="primary">Ver más</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;



