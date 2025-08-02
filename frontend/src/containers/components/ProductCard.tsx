import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
    _id: string
    name: string
    image: string
    price: string
}

export default function ProductCard({ name, image, price }: Props) {
    return (
        <Card>
            <CardMedia
                sx={{ height: 240 }}
                image={image}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {price} EGP
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small">Add to Cart</Button>

            </CardActions>
        </Card>
    );
}
