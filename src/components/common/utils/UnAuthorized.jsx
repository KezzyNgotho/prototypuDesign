import { Button, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { red } from '@mui/material/colors';

const UnAuthorized = () => {
    const navigate = useNavigate()

    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
                <LockIcon sx={{ color: red[700], fontSize: 50, mt: 2 }} />
            </Grid>
            <Grid item>
                <Typography variant="h5" align="center" gutterBottom>
                    Unauthorized Access
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" align="center" gutterBottom>
                    You are not allowed to view this page.
                </Typography>
            </Grid>
            <Grid item>
                <Box display="flex" justifyContent="center">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(-1)}
                    >
                        GO BACK
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/")}
                        style={{ marginLeft: '8px' }}
                    >
                        LOG IN WITH ALLOWED ACCOUNT
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default UnAuthorized;
