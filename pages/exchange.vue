<template>
  <section>
    <CardContainer
      title="Top Exchange Coins"
      class="bg-transparent"
      v-if="top_exchange_rate() && Array.isArray(top_exchange_rate())"
    >
      <ul class="cards d-flex align-items-center flex-wrap gap-3 px-0 pt-3">
        <li
          class="d-flex col-sm-12 flex-wrap col-md-8 col-lg-5 align-items-center justify-content-between bg-dark px-3 rounded py-3"
          v-for="item in top_exchange_rate()"
          :key="item.id"
        >
          <div class="cap me-5 d-flex align-items-center">
            <img
              :src="item.image"
              :alt="item.id"
              class="img-thumbnail top_img"
            />
            <div class="details ms-3">
              <p class="mb-0">{{ item.name }}</p>
              <p class="mb-0 text-small text-muted">{{ item.id }}</p>
            </div>
          </div>

          <div class="raio">
            <p
              class="mb-0 text-small"
              style="color: var(--bs-teal); text-align: end"
            >
              {{ item.trust_score }}%
            </p>
            <p class="mb-0 text-small text-muted">
              {{ item.trade_volume_24h_btc.toLocaleString() }}
            </p>
          </div>
        </li>
      </ul>
    </CardContainer>
    <br />
    <CardContainer title="All Exchange Scores" class="bg-transparent">
      <Tableu
        :columns="[
          { title: '#' },
          { title: 'Excahnge' },
          { title: '24H Vol' },
          { title: '24 Vol(Normailized)' },
          { title: 'Score' },
          { title: 'Rank' },
        ]"
      ></Tableu>
    </CardContainer>
  </section>
</template>

<script>
import CardContainer from '../components/CardContainer.vue'
export default {
  name: 'Exchange',
  components: { CardContainer },
  data: () => ({
    rates: '',
  }),
  methods: {
    exchange_rate: async function () {
      let result = await fetch('https://api.coingecko.com/api/v3/exchanges')
      return await result.json()
    },

    top_exchange_rate: function () {
      // Check if the rates data is available
       if (!Array.isArray(this.rates) && this.rates === '') return null;

      //  Filter out the data that has the top 3 data trust score (max =10)
      let result = this.rates.filter((item) => item.trust_score === 10)

      return result.length < 3 ? result : result.splice(0, 3)
    },
  },
  async created() {
    this.rates = await this.exchange_rate()
   //  console.log(this.top_exchange_rate())
  },
}
</script>

<style lang="scss" scoped></style>