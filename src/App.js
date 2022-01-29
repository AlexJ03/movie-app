import { useState, useEffect } from "react";
import Cart from "./components/Cart";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "@mui/material/Input";
import DarkModeToggle from "react-dark-mode-toggle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
    const [loading, setLoading] = useState(false); //TODO
    const [year, setYear] = useState("");
    const [arr, setArr] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(
            `https://api.kinopoisk.dev/movie?search=${year}&field=year&token=ZQQ8GMN-TN54SGK-NB3MKEC-ZKB8V06&limit=400`
        ).then((response) => response.json());
        const movieList = response.docs;

        let obj = {};
        if (arr.length === 0) {
            for (let i = 0; i < movieList.length; i++) {
                obj = {
                    title: movieList[i].name || movieList[i].alternativeName,
                    img: movieList[i].poster.previewUrl,
                    description: movieList[i].description,
                    year: movieList[i].year,
                };
                if (
                    obj.description &&
                    obj.year &&
                    obj.year === movieList[i].year
                ) {
                    arr.push(obj);
                    obj.length = 0;
                }
            }
        } else {
            arr.splice(0, arr.length);
            for (let i = 0; i < movieList.length; i++) {
                obj = {
                    title: movieList[i].name || movieList[i].alternativeName,
                    img: movieList[i].poster.previewUrl,
                    description: movieList[i].description,
                    year: movieList[i].year,
                };
                if (
                    obj.description &&
                    obj.year &&
                    obj.year === movieList[i].year
                ) {
                    arr.push(obj);
                    obj.length = 0;
                }
            }
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };
    let items = [];
    items = arr.map((item, index) => (
        <Grid item xs={12} sm={4} md={4} lg={3} sx={{ p: 1 }} key={index}>
            <Cart
                key={index}
                title={item.title}
                img={item.img}
                desc={item.description}
            />
        </Grid>
    ));

    const [isDarkMode, setIsDarkMode] = useState(() => false);

    useEffect(() => {
        const input = document.getElementById("searchYear");
        const inputSearch = document.getElementById("inputSearch");
        if (isDarkMode) {
            document.body.style.backgroundColor = "#202020";
            input.classList.remove("light-mode");
            input.classList.add("dark-mode");
            inputSearch.style.color = "#fff";
        } else {
            document.body.style.backgroundColor = "#ffffff";
            input.classList.remove("dark-mode");
            input.classList.add("light-mode");
            inputSearch.style.color = "#000";
        }
    });

    const keydownFunc = (e) => {
        if (e.key === "Enter") {
            fetchData();
        }
    };

    return (
        <Grid>
            <Grid
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Input
                        type="text"
                        onChange={(e) => setYear(e.target.value)}
                        autoFocus
                        placeholder="Введите год"
                        id="searchYear"
                        onKeyDown={keydownFunc}
                        sx={{
                            bgcolor: "transparent",
                        }}
                    />
                    <Input
                        type="submit"
                        value="Найти"
                        onClick={() => fetchData()}
                        sx={{ color: "#fff" }}
                        id="inputSearch"
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DarkModeToggle
                        onChange={setIsDarkMode}
                        checked={isDarkMode}
                        size={70}
                    />
                </Box>
            </Grid>
            <Grid container sx={{ mx: "auto", width: "100%", justifyContent: 'center' }}>
                {!loading ? (
                    items
                ) : (
                    <Grid sx={{mt: "25vh"}}>
                        <CircularProgress />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default App;
