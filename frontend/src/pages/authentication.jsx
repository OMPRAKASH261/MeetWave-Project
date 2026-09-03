import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    const navigate = useNavigate();

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                const loginSuccess = await handleLogin(username, password);
                if (loginSuccess) {
                    navigate('/home');
                }
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let message = (err.response?.data?.message) || "Something went wrong";
            setError(message);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <CssBaseline />
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        width: { sm: '40%', md: '60%' },
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                        <h1>MeetWave</h1>
                        <p>Connect with anyone, anywhere</p>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xs: '100%', sm: '60%', md: '40%' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>


                        <div>
                            <Button variant={formState === 0 ? "contained" : ""} onClick={() => { setFormState(0) }}>
                                Sign In
                            </Button>
                            <Button variant={formState === 1 ? "contained" : ""} onClick={() => { setFormState(1) }}>
                                Sign Up
                            </Button>
                        </div>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Full Name"
                                name="username"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            /> : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}

                                id="password"
                            />

                            <p style={{ color: "red" }}>{error}</p>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login " : "Register"}
                            </Button>

                        </Box>
                    </Box>
                </Box>
            </Box>

            <Snackbar

                open={open}
                autoHideDuration={4000}
                message={message}
            />

        </ThemeProvider>
    );
}