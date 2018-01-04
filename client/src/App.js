import React, { Component } from 'react'
import $ from 'jquery'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Accordion, Checkbox } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {
      activeIndex: 0,
    }
    this.getDrinks = this.getDrinks.bind(this);
    this.getDrink = this.getDrink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  componentDidMount () {
    this.getDrinks()
    window.fetch('api/drinks')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error))
  }
  fetch (endpoint) {
    return new Promise((resolve, reject) => {
      window.fetch(endpoint)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    })
  }
  getDrinks () {
    this.fetch('api/drinks')
      .then(drinks => {
        this.setState({drinks: drinks})
        this.getDrink(drinks[0].id)
      })
  }
  getDrink (id) {
    this.fetch(`api/drinks/${id}`)
      .then(drink => this.setState({drink: drink}))
  }
  render () {
    const { activeIndex } = this.state
    let {drinks, drink} = this.state
    return drinks
    ? <Container text>
        <Header as='h2' icon textAlign='center'>
        <Icon name='gift' circular />
        <Header.Content>
          42 Coupons for Courtney
        </Header.Content>
      </Header>
      {drinks &&
        <Container>
          <Accordion fluid styled>
          {Object.keys(drinks).map((key) => {
            return (
              <div key={key}>
                <Accordion.Title active={activeIndex === key} index={key} onClick={this.handleClick}>
                  <Checkbox checked={drinks[key].complete}/>
                  <Icon name='dropdown' />
                  {drinks[key].id}. &nbsp;{drinks[key].title}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === key}>
                  <p>{drinks[key].description}</p>
                  {drinks[key].source ?
                    (<p><a href={drinks[key].source} target="_blank">More info...</a></p>)
                    :
                    (<p></p>)
                  }
                </Accordion.Content>
              </div>
              )
            })}
          </Accordion>
        </Container>
      }
    </Container>
    : <Container text>
      <Dimmer active inverted>
        <Loader content='Loading' />
      </Dimmer>
    </Container>
  }
}

export default App
