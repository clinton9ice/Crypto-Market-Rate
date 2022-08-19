export const state = () => ({
  selected_currency: 'usd',
  currencies: [],
  coin_market: [],
  coin_list: [],
})

export const getters = {
  getCounter(state) {
    return state.counter
  },
  getCurrency(state) {
    return state.selected_currency
  },
}

export const mutations = {
  Set_currency(states, payload) {
    states.currencies = payload
  },

  change_currency(states, payload) {
    states.selected_currency = payload
    this.dispatch('coin_market')
    return states.selected_currency
  },

  Coin_Market(s, payload) {
    s.coin_market = payload
  },
}

export const actions = {
  async coin_market(context) {
    let req = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${context.state.selected_currency}&order=market_cap_desc&per_page=150&page=1&sparkline=false`
    )
    context.commit('Coin_Market', await req.json())
    
  },
}
