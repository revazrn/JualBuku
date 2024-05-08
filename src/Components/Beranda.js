import React from 'react'
import { Link } from "react-router-dom";
import './Beranda.css';

class Beranda extends React.Component {
    render(){
        return(
        <div className='container'>
            <header>
                <h1 className='title'>Welcome To My Personal Website</h1>
                <p className='subtitle'>Ini adalah halaman portofolio saya</p> 
            </header>
            <section className='content'>
                <h2 className='sectionTitle'>Tentang Saya</h2>
                <p className='sectionContent'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada, diam sit amet fermentum ultricies, 
                    felis metus placerat ligula, nec tempor justo felis in dui. Vestibulum scelerisque, 
                    nulla et ullamcorper efficitur, nisl nisi molestie lacus, ac lacinia elit ipsum id ipsum.
                </p>
            </section>
            <section className='content'>
                <h2 className='sectionTitle'>Karya Saya</h2>
                <div className='gallery'>
                    <Link to="/karya">
                        <button className='button'>Lihat Karya</button>
                    </Link>
                </div>
            </section>
            <section className='content'>
                <h2 className='sectionTitle'>Kontak Saya</h2>
                <div className='gallery'>
                    <Link to="/kontak">
                        <button className='button'>Hubungi Saya</button>
                    </Link>
                </div>
            </section>
        </div>
        )
    }
}

export default Beranda;