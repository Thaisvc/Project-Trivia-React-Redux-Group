
# Trivia React Redux 🧠🎮

Projeto de estudo em **Front-end com React e Redux**, desenvolvido durante a formação em **Desenvolvimento Web da Trybe**.  
Uma aplicação de **quiz de perguntas e respostas** que usa Redux para gerenciar estado global e interagir com uma API de trivia.

---

## 💡 Sobre

Essa aplicação é um **jogo de trivia** onde o usuário pode:

✔️ Digitar nome e e-mail  
✔️ Iniciar um jogo de perguntas  
✔️ Responder perguntas de múltipla escolha  
✔️ Ver pontuação ao final  
✔️ Navegar entre telas de maneira fluida

O foco principal do projeto foi praticar:

- React (componentes funcionais)
- Redux (estado global)
- Consumo de API
- Gerenciamento de rotas com React Router
- Testes básicos de componentes

---

## 🛠 Tecnologias utilizadas

- **React**
- **Redux / Redux Thunk**
- **React Router**
- **CSS**
- **JavaScript (JSX)**
- API de trivia pública (Open Trivia DB ou similar)

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Thaisvc/Project-Trivia-React-Redux-Group.git
cd Project-Trivia-React-Redux-Group
````

### 2. Instale as dependências

```bash
npm install
```

ou

```bash
yarn install
```

---

### 3. Inicie a aplicação

```bash
npm start
```

ou

```bash
yarn start
```

Isso deve abrir o app em:

```
http://localhost:3000
```

---

## 📌 Funcionalidades

### 🧍 Login <br>

Na tela inicial o usuário informa nome e e-mail para entrar no jogo.



### ❓ Perguntas

Após o login, o jogo apresenta perguntas com alternativas.
O usuário:

✔️ seleciona uma resposta <br>
✔️ recebe feedback visual <br>
✔️ navega para a próxima pergunta <br>


### 🏁 Resultado

No final do quiz, o app mostra:

* Pontuação total
* Respostas corretas
* Botão para reiniciar ou voltar ao início

---

## 📁 Estrutura do projeto

```
Project-Trivia-React-Redux-Group/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── store.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

## 🧪 Testes (opcional)

Se houver testes configurados, rode:

```bash
npm test
```

Os testes podem verificar:

✔️ Renderização de componentes <br>
✔️ Interações (botões, seleção de respostas) <br>
✔️ Fluxo de tela completo <br>

---

## 📚 Aprendizado

Com esse projeto consolidou:

✔️ Componentes React e JSX <br>
✔️ Gestão de estado global com Redux <br>
✔️ Consumo de APIs assíncronas <br>
✔️ Navegação entre telas (React Router) <br>
✔️ Lógica de quiz e pontuação <br>


---
