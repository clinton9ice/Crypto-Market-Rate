<template>
  <main v-if="Object.keys(result).length > 0">
    <header class="px-2">
      <div class="left">
        <div class="name d-flex align-items-center">
          <div class="img-thumbs me-2">
            <img :src="result.image.large" alt="" class="img-thumb icon" />
          </div>
          <h3>
            {{ result.name }}
            <sup class="text-small text-uppercase">({{ result.symbol }})</sup>
          </h3>
        </div>
        <br />
        <div class="d-flex align-items-center gap-2">
          <h2 class="point">
            <span
              v-for="(cap, index) in Object.keys(
                result.market_data.current_price
              )"
              :key="cap"
            >
              <span v-if="cap === currentCurrency">
                <span v-if="cap === 'usd'"
                  >$
                  {{
                    Object.values(result.market_data.current_price)[
                      index
                    ].toLocaleString()
                  }}</span
                >
                <span v-else-if="currentCurrency === 'eth'">
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
                  {{
                    Object.values(result.market_data.market_cap)[
                      index
                    ].toLocaleString()
                  }}
                </span>

                <span v-else-if="currentCurrency === 'btc'">
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
                  {{
                    Object.values(result.market_data.market_cap)[
                      index
                    ].toLocaleString()
                  }}
                </span>

                <span v-else>
                  {{
                    Object.values(result.market_data.market_cap)[
                      index
                    ].toLocaleString()
                  }}
                  <span class="text-small text-muted">
                    {{ currentCurrency }}
                  </span>
                </span>
              </span>
            </span>
          </h2>
          <sup
            class="bg-danger badge"
            v-if="result.market_data.market_cap_change_percentage_24h < 0"
            >{{
              result.market_data.market_cap_change_percentage_24h.toFixed(1)
            }}%</sup
          >
          <sup class="bg-success badge" v-else
            >{{
              result.market_data.market_cap_change_percentage_24h.toFixed(1)
            }}%</sup
          >
        </div>
        <p>
          <span class="text-muted">last updated: </span>
          <span class="fw-bold">{{ result.last_updated }}</span>
        </p>
        <div class="details py-4 col-7">
          <p class="border-bottom border-dark">
            <span class="me-3">
              <span class="text-muted me-3">Market Cap:</span>
              <span
                v-for="(cap, index) in Object.keys(
                  result.market_data.market_cap
                )"
                :key="cap"
              >
                <span v-if="cap === currentCurrency">
                  <span v-if="cap === 'usd'"
                    >$
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}</span
                  >
                  <span v-else-if="currentCurrency === 'eth'">
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
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

                  <span v-else-if="currentCurrency === 'btc'">
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
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
                  <span v-else>
                    {{ currentCurrency }}
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p class="border-bottom border-dark">
            <span>
              <span class="me-3 text-muted">24 Hour Trading:</span>
              <span
                v-for="(cap, index) in Object.keys(
                  result.market_data.price_change_24h_in_currency
                )"
                :key="cap"
              >
                <span v-if="cap === currentCurrency">
                  <span v-if="cap === 'usd'"
                    >$
                    {{
                      Object.values(result.market_data.high_24h)[
                        index
                      ].toLocaleString()
                    }}</span
                  >
                  <span v-else-if="currentCurrency === 'eth'">
                    {{
                      Object.values(result.market_data.high_24h)[
                        index
                      ].toLocaleString()
                    }}
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
                      /></svg
                  ></span>

                  <span v-else-if="currentCurrency === 'btc'">
                    {{
                      Object.values(result.market_data.high_24h)[
                        index
                      ].toLocaleString()
                    }}
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
                      /></svg
                  ></span>
                  <span v-else>
                    {{ currentCurrency }}
                    {{
                      Object.values(result.market_data.high_24h)[
                        index
                      ].toLocaleString()
                    }}
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p class="border-bottom border-dark">
            <span class="">
              <span class="me-3 text-muted">Fully Dilluted Valuation:</span>
              <span
                v-for="(cap, index) in Object.keys(
                  result.market_data.fully_diluted_valuation
                )"
                :key="cap"
              >
                <span v-if="cap === currentCurrency">
                  <span v-if="cap === 'usd'"
                    >$
                    {{
                      Object.values(result.market_data.fully_diluted_valuation)[
                        index
                      ].toLocaleString()
                    }}</span
                  >
                  <span v-else-if="currentCurrency === 'eth'">
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
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

                  <span v-else-if="currentCurrency === 'btc'">
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
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

                  <span v-else>
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
                    {{ currentCurrency }}
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p>
            <span class="text-muted">Circulating Supply: </span>
            <span class="fw-bold">{{
              result.market_data.circulating_supply.toLocaleString()
            }}</span>
          </p>
          <p>
            <span class="text-muted">Total Supply: </span>
            <span>{{ result.market_data.total_supply.toLocaleString() }}</span>
          </p>

          <p>
            <span class="text-muted">Total Volume: </span>
            <span
              v-for="(cap, index) in Object.keys(
                result.market_data.total_volume
              )"
              :key="cap"
            >
              <span v-if="cap === currentCurrency">
                <span v-if="cap === 'usd'"
                  >$
                  {{
                    Object.values(result.market_data.total_volume)[
                      index
                    ].toLocaleString()
                  }}</span
                >
                <span v-else>
                  {{
                    Object.values(result.market_data.market_cap)[
                      index
                    ].toLocaleString()
                  }}
                  {{ currentCurrency }}
                </span>
              </span>
            </span>
          </p>

          <p>
            <span class="text-muted">Max Supply: </span>
            <span>{{ result.market_data.max_supply.toLocaleString() }}</span>
          </p>
        </div>
      </div>

      <div class="right"></div>
    </header>
    <article class="py-5"></article>
  </main>
</template>

<script>
export default {
  head: {
    title: 'Coins Details',
  },
  async asyncData({ params, redirect }) {
    let result = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.slug}`
    ).then((res) => res.json())
    // console.log(result)
    return { result }
  },
  computed: {
    currentCurrency() {
      return this.$store.state.selected_currency
    },
  },
}
</script>

<style scoped>
.img-thumbs {
  overflow: hidden;
}
.img-thumbs img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--bs-gray-800);
}
</style>