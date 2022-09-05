<template>
  <section>
    <CardContainer title="Top Exchange Coins" class="bg-transparent">
      <ul
        class="cards d-flex align-items-center flex-wrap gap-3 px-0 pt-3"
        v-if="top_exchange_rate() && Array.isArray(top_exchange_rate())"
      >
        <li
          class="d-flex col-sm-12 flex-wrap col-md-8 col-lg-5 align-items-center justify-content-between bg-dark px-3 rounded py-3"
          v-for="item in top_exchange_rate()"
          :key="item.id"
        >
          <div
            class="cap me-5 d-flex align-items-center flex-wrap gap-3 w-100 justify-content-between"
          >
            <div class="img">
              <img
                :src="item.image"
                :alt="item.id"
                class="img-thumbnail top_img"
              />
            </div>

            <div
              class="d-flex ms-3 sm-ms-0 gap-2 w-100 align-items-center justify-content-between flex-wrap"
            >
              <div class="details">
                <p class="mb-0">{{ item.name }}</p>
                <p class="mb-0 text-small text-muted">{{ item.id }}</p>
              </div>

              <div class="raio">
                <p
                  class="mb-0 text-small"
                  style="color: var(--bs-teal);"
                >
                  {{ item.trust_score }}%
                </p>
                <p class="mb-0 text-small text-muted">
                  {{ item.trade_volume_24h_btc.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </CardContainer>

    <br />
    <CardContainer title="All Exchange Scores" class="bg-transparent">
      <Tableu :columns="tHead" :datas="rates">
        <template #td="{ data, i }">
          <td class="td">{{ i + 1 }}</td>
          <td class="td">
            <a
              :href="data.url"
              target="_blank"
              class="d-flex nav-link align-items-start"
            >
              <img
                :src="data.image"
                :alt="data.name"
                class="img-thumbnail border-0 bg-transparent"
              />
              <h6 class="ms-2">
                {{ data.name }}
                <p class="text-small text-muted">{{ data.country }}</p>
              </h6>
            </a>
          </td>
          <td class="td">B{{ data.trade_volume_24h_btc.toLocaleString() }}</td>
          <td class="td">
            B
            {{ data.trade_volume_24h_btc_normalized.toLocaleString() }}
          </td>

          <td class="td">
            <button class="btn">
              <i
                class="bi bi-star-fill text-warning"
                v-for="(item, index) in data.trust_score"
                :key="index"
              ></i>
            </button>

            <span class="text-muted"> ({{ data.trust_score }})</span>
          </td>
        </template>
      </Tableu>
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
    tHead: [
      { title: '#' },
      { title: 'Exchange' },
      { title: '24H Vol' },
      { title: '24 Vol(Normailized)' },
      { title: 'Trust Score' },
    ],
  }),
  methods: {
    exchange_rate: async function () {
      let result = await fetch('https://api.coingecko.com/api/v3/exchanges')
      return await result.json()
    },

    top_exchange_rate: function () {
      // Check if the rates data is available
      if (!Array.isArray(this.rates) && this.rates === '') return null

      //  Filter out the data that has the top 3 data trust score (max =10)
      let result = this.rates.filter((item) => item.trust_score === 10)

      return result.length < 3 ? result : result.splice(0, 3)
    },
  },
  async created() {
    this.rates = await this.exchange_rate()
    // console.log(this.rates)
  },
}
</script>

<style lang="scss" scoped></style>