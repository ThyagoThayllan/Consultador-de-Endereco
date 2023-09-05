import { useState } from 'react'
import styles from './App.module.css'
import axios from 'axios'
import mapIcon from './imgs/map-icon.svg'

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

  const getEndereco = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const data = response.data
      setEndereco(data)
      console.log(data)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.pesquisar}>
        <h1>Consulta de Endereço</h1>
        <form id='form' className={styles.form} onSubmit={getEndereco}>
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

        {endereco && (
          <div className={styles.enderecoDiv}>

            <p>{endereco.cep && `CEP: ${endereco.cep}`}</p>
            <div className={styles.cidadeEstado}>
              <img src={mapIcon} />
              <p>{`${endereco.localidade} - ${endereco.uf}`}</p>
            </div>
            <p>{endereco.bairro}</p>
            <p>{endereco.logradouro}</p>

          </div>
        )}

      </div>
    </div>
  )
}