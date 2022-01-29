import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'

        }}>
            <CircularProgress />
        </div>
    );
}

export default Loader;
