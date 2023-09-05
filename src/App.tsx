import { useEffect, useState } from 'react'
import styles from './App.module.css'
import axios from 'axios'

export const App = () => {

  type EnderecoProps = {
    cep: number,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: number,
    ddd: number
  }

  const [endereco, setEndereco] = useState<EnderecoProps>()
  const [cep, setCep] = useState<number>()

  const getEndereco = async () => {

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const data = response.data
      setEndereco(data)
      console.log(data)

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    getEndereco();

  }, [cep])

  const seeEndereco = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    getEndereco();
  }

return (
  <div className={styles.container}>
    <div className={styles.pesquisar}>
      <h1>Consulta de Endereço</h1>
      <form id='form' className={styles.form} onSubmit={seeEndereco}>
        <div>
          <label htmlFor="pesquisarEndereco">
            {cep ? `Pesquisando pelo CEP: ${cep}` : 'Pesquise seu CEP:'}
          </label>
          <input
            type="text"
            name='pesquisarEndereco'
            id='pesquisarEndereco'
            placeholder='Digite seu CEP'
            onChange={(e) => setCep(e.target.value as unknown as number)}
          />
        </div>
        <button type='submit'>Pesquisar</button>
      </form>

      

      {endereco &&  (
          <div className='enderecoDiv'>
            <p>{endereco.cep}</p>
            <p>{endereco.uf}</p>
            <p>{endereco.localidade}</p>
            <p>{endereco.bairro}</p>
            <p>{endereco.logradouro}</p>
          </div>
        )}

    </div>
  </div>
)
}