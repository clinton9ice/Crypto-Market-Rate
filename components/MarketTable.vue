<template>
  <CardContainer title="Market Data" :responsive="true">
    <Tableu :columns="tbColumns" :datas="coinMarket">
      <template #td="{ data }">
        <td class="border-0">
          <span class="bi bi-star me-1"></span>
          <span>{{ data.market_cap_rank }}</span>
        </td>

        <td class="border-0 nowrap me-2">
          <div class="d-flex align-items-center">
            <div
              class="img bg-dark me-2"
              style="width: 40px; height: 40px; border-radius: 50%"
            >
              <img
                :src="data.image"
                class="img-thumbnail bg-transparent border-0"
                :alt="data.symbol"
                loading="lazy"
                style="width: 40px"
              />
            </div>
            <nuxt-link :to="'/coins/' + data.id" class="text-white">{{
              data.name
            }}</nuxt-link>
            <sup class="text-muted ms-2">{{ data.symbol }}</sup>
          </div>
        </td>

        <td class="border-0 nowrap">
          <span v-if="currency === 'usd'">$</span>
          <span v-else-if="currency === 'btc'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-4H8V8h3V6h2v2h1a2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-2 4h-1v2h-2v-2zm-1-3v1h4a.5.5 0 1 0 0-1h-4zm0-3v1h4a.5.5 0 1 0 0-1h-4z"
                fill="rgba(255,255,255,1)"
              />
            </svg>
          </span>
          <span v-else-if="currency === 'eth'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.95-9H15v2h-4.95a2.5 2.5 0 0 0 4.064 1.41l1.7 1.133A4.5 4.5 0 0 1 8.028 13H7v-2h1.027a4.5 4.5 0 0 1 7.788-2.543L14.114 9.59A2.5 2.5 0 0 0 10.05 11z"
                fill="rgba(255,255,255,1)"
              />
            </svg>
          </span>
          <span class="text-muted text-uppercase" v-else>{{ currency }}</span>
          {{ data.current_price.toLocaleString() }}
        </td>

        <td class="border-0">
          <span
            class="text-danger"
            v-if="
              data.price_change_percentage_24h !== null &&
              data.price_change_percentage_24h < 0
            "
            >{{ data.price_change_percentage_24h.toFixed(1) }}%
            <i class="bi bi-caret-down-fill me-2"></i
          ></span>
          <span
            style="color: var(--bs-teal)"
            v-else-if="
              data.price_change_percentage_24h !== null &&
              data.price_change_percentage_24h >= 0
            "
            >{{ data.price_change_percentage_24h.toFixed(1) }}%
            <i class="bi bi-caret-up-fill me-2"></i>
          </span>
        </td>

        <td class="border-0">
          <span
            class="text-danger"
            v-if="data.ath_change_percentage && data.ath_change_percentage < 0"
            >{{ data.ath_change_percentage.toFixed(1) }}%
            <i class="bi bi-caret-down-fill me-2"></i
          ></span>
          <span
            style="color: var(--bs-teal)"
            v-else-if="
              data.ath_change_percentage && data.ath_change_percentage >= 0
            "
            >{{ data.ath_change_percentage.toFixed(1) }}%
            <i class="bi bi-caret-up-fill me-2"></i>
          </span>
        </td>

        <td class="border-0 nowrap">
          <span v-if="currency == 'usd'">$</span>
          <span v-else-if="currency === 'btc'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-4H8V8h3V6h2v2h1a2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-2 4h-1v2h-2v-2zm-1-3v1h4a.5.5 0 1 0 0-1h-4zm0-3v1h4a.5.5 0 1 0 0-1h-4z"
                fill="rgba(255,255,255,1)"
              />
            </svg>
          </span>
          <span v-else-if="currency === 'eth'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.95-9H15v2h-4.95a2.5 2.5 0 0 0 4.064 1.41l1.7 1.133A4.5 4.5 0 0 1 8.028 13H7v-2h1.027a4.5 4.5 0 0 1 7.788-2.543L14.114 9.59A2.5 2.5 0 0 0 10.05 11z"
                fill="rgba(255,255,255,1)"
              />
            </svg>
          </span>
          <span class="text-muted text-uppercase" v-else>{{ currency }}</span>
          {{ data.total_volume.toLocaleString() }}
        </td>

        <td class="border-0 nowrap">
          <span v-if="currency === 'usd'">$</span>
          <span v-if="currency === 'btc'">B</span>
          <span v-if="currency === 'eth'">E</span>
          {{ data.market_cap.toLocaleString() }}
        </td>
      </template>
    </Tableu>
    <br />
  </CardContainer>
</template>

<script>
export default {
  data() {
    return {
      tbColumns: [
        {
          title: 'Rank',
        },
        {
          title: 'Coin',
        },
        {
          title: 'Price',
          key: 'lastPrice',
        },
        {
          title: '24hr',
        },
        {
          title: 'ATH',
        },
        {
          title: 'Volume',
        },
        {
          title: 'Mkt Cap',
        },
      ],
      coinMarket: [],
    }
  },

  computed: {
    currency() {
      return this.$store.state.selected_currency
    },
    market() {
      return this.$store.state.coin_market
    },
  },

  watch: {
    market(e) {
      this.coinMarket = e;
    },
  },
  async created() {
    try {
      this.$store.dispatch('coin_market')
      setInterval(() => {
        this.$store.dispatch('coin_market')
      }, 12000)
    } catch (error) {
      this.$Notice.open({ title: error, type: 'error' })
    }
  },
}
</script>

<style lang="scss" scoped></style>
