import './Wallet.css';
import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import logo from '../imagens/logowallet.png';

class Wallet extends React.Component {
  render() {
    return (
      <section className="wallet">
        <div className="project_title">
          <img className="logo" src={ logo } alt="wallet" />
          TrybeWallet

        </div>
        <Header />
        <WalletForm />
        <Table />
        <section className="footer">
          <BsLinkedin
            className="footer_icon"
            size="25px"
            onClick={ () => {
              window.open('https://www.linkedin.com/in/vinicius-rcampos/', '_blank');
            } }
          />
          <BsGithub
            size="25px"
            className="footer_icon"
            onClick={ () => {
              window.open('https://github.com/ViniciusRCampos', '_blank');
            } }
          />
          <p className="signature">ViniciusRCampos</p>
        </section>
      </section>
    );
  }
}

export default Wallet;
