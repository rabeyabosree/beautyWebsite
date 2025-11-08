import React from 'react'
import Banner from './../components/common/Banner';
import Navbar from './../components/common/Navbar';
import Footer from './../components/common/Footer';
import HomeProducts from './../components/HomeProducts';

function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <HomeProducts />
            <Footer />
        </>
    )
}

export default Home