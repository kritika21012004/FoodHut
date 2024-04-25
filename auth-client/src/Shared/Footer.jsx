import React from 'react'
import logo from "../assets/image2.svg"
const Footer = () => {
  return (
    <footer className='footer p-10 bg-red-200/30 text-base'>
    <aside>
        <img src={logo} alt=''/>
    </aside>
        <nav>
            <header className='footer-title text-xl text-[#f54748]'>Services</header>
            <a className='link link-hover'>Branding</a>
            <a className='link link-hover'>Design</a>
            <a className='link link-hover'>Marketing</a>
            <a className='link link-hover'>Advertisement</a>
        </nav>
        <nav>
            <header className='footer-title text-xl text-[#f54748]'>Comapny</header>
            <a className='link link-hover'>About us</a>
            <a className='link link-hover'>Contact</a>
            <a className='link link-hover'>Jobs</a>
            <a className='link link-hover'>Press Kit</a>
        </nav>
        <nav>
            <header className='footer-title text-xl text-[#f54748]'>Legal</header>
            <a className='link link-hover'>Terms of Use</a>
            <a className='link link-hover'>Privacy of policy</a>
            <a className='link link-hover'>Cookie Policy</a>
        </nav>
    </footer>
  )
}

export default Footer
