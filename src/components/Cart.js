import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Cart = ({ title, desc, img }) => {
    return (
        <Card sx={{ maxWidth: 390, mt: 3, height: 600, boxShadow: '1px 1px 7px 0 #b3b3b3'}}>
            <CardMedia component="img" height="350" image={img} alt={title} />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {desc}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Cart;
