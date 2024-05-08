import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Beranda from './Components/Beranda';
import TentangSaya from './Components/Tentangsaya';
import Karya from './Components/Karya';
import Kontak from './Components/Kontak';
import Gallery from './Gallery';
import Cart from './Components/cart';

class Utama extends React.Component {
    render(){
        return(
            <Routes>
                <Route exact path="/Beranda" Component={Beranda} />
                <Route exact path="/Tentangsaya" Component={TentangSaya} />
                <Route exact path="/Karya" Component={Karya} />
                <Route exact path="/Kontak" Component={Kontak} />
                <Route exact path="/Gallery" Component={Gallery} />
                <Route exact path="/cart" Component={Cart} />

            </Routes>
        );
    }
}

export default Utama;