<template>
  <a-config-provider>
    <template #renderEmpty>
      <div style="text-align: center">
        <div v-if="!isLoading">
          <a-icon
            v-if="casesListError"
            style="font-size: 24px; margin-top: 15px"
            type="frown"
            data-cy="cases_list_editor"
          />
          <a-icon
            v-else
            style="font-size: 24px; margin-top: 15px"
            type="smile"
            data-cy="cases_list_else"
          />
          <p v-if="casesListError" style="margin-top: 5px" data-cy="admin_error">
            some_text
          </p>
          <p v-else style="margin-top: 5px" data-cy="nothing">some_text</p>
        </div>
      </div>
    </template>
    <div class="config-provider">
      <a-table
        data-cy="cases_list"
        :data-source="cases"
        :loading="isLoading"
        :pagination="
          isLoading && !cases.length
            ? false
            : Object.freeze({
                total: paging.total,
                current: paging.current,
                pageSize: paging.pageSize,
                defaultPageSize: paging.defaultPageSize,
                showSizeChanger: paging.showSizeChanger,
                onShowSizeChange: showSizeChange,
                pageSizeOptions: paging.pageSizeOptions,
              })
        "
        row-key="id"
        @change="handleChangePage"
      >
        <a-table-column key="id" align="center" data-index="id" title="" data-cy="cases_list_table_column">
          <template slot-scope="id">
            <nuxt-link :to="'/cases/' + id">
              <a-icon style="font-size: 22px" type="right" />
            </nuxt-link>
          </template>
        </a-table-column>

        <a-table-column
          key="stage"
          align="center"
          data-index="stage"
          title="some_text"
        />

        <a-table-column
          key="codex_articles"
          align="center"
          data-index="codex_articles"
          title="some_text"
        >
          <template slot-scope="tags">
            <span>
              <a-tag
                v-for="tag in tags.split(', ')"
                :key="tag"
                @click="
                  (tag) => {
                    updateUrlParamsKeyValue('codex_articles', tag);
                  }
                "
                >{{ tag }}</a-tag
              >
            </span>
          </template>
        </a-table-column>

        <a-table-column
          key="entry_date"
          :scoped-slots="{ customRender: 'entry_date' }"
          :sorter="true"
          align="center"
          data-index="entry_date"
          default-sort-order="descend"
          title="some_text some_text"
          data-cy="receipt_date"
        />
        <a-table-column
          key="last_scheduled_hearing_date"
          :scoped-slots="{ customRender: 'last_scheduled_hearing_date' }"
          :sorter="true"
          align="center"
          data-index="last_scheduled_hearing_date"
          title="some_text some_text"
          data-cy="date_of_review"
        />
        <a-table-column
          key="defendants_simple"
          align="center"
          data-index="defendants_simple"
          title="some_text"
        />
        <a-table-column
          key="result_type"
          align="center"
          data-index="result_type"
          title="some_text"
        />
        <a-table-column
          key="penalties"
          align="center"
          data-index="penalties"
          title="some_text"
        >
          <template slot-scope="penalty">
            <span>{{ penalty[0] ? penalty[0].human_readable : '-' }}</span>
          </template>
        </a-table-column>
        <a-table-column key="court" data-index="court" title="some_text" />

        <a-table-column key="url" align="center" data-index="url">
          <template slot-scope="url">
            <a :href="url">
              <a-icon style="font-size: 22px" type="link" />
            </a>
          </template>
        </a-table-column>

        <a-table-column
          key="result_text_id"
          align="center"
          data-index="result_text_id"
        >
          <template slot-scope="result_text_id">
            <nuxt-link
              v-if="result_text_id"
              :to="'/cases/text/' + result_text_id"
            >
              <a-icon style="font-size: 22px" type="file-text" />
            </nuxt-link>
            <a-icon
              v-else
              style="color: #f04e23; font-size: 22px; opacity: 0.2"
              type="file-text"
            />
          </template>
        </a-table-column>

        <a-table-column
          key="in_favorites"
          align="center"
          data-index="in_favorites"
          title=""
        >
          <template slot-scope="id">
            <a>
              <a-icon
                :theme="id ? 'filled' : 'outlined'"
                style="font-size: 22px"
                type="star"
                @click="handleFav"
              />
            </a>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </a-config-provider>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ConfigProvider, Icon, Table, Tag } from 'ant-design-vue';

export default {
  name: 'CasesTable',
  components: {
    'a-table': Table,
    'a-table-column': Table.Column,
    'a-config-provider': ConfigProvider,
    'a-icon': Icon,
    'a-tag': Tag,
  },
  data() {
    return {
      isLoading: true,
    };
  },

  computed: {
    ...mapState({ urlGetParams: (state) => state.localStorage.urlGetParams }),

    ...mapState([
      'cases',
      'paging',
      'itemsTotal',
      'auth',
      'presets',
      'presetsDict',
      'activePresetId',
      'activePreset',
      'currentLink',
      'loading',
      'casesListError',
    ]),
  },

  watch: {
    loading: function (value) {
      this.isLoading = value;
    },
  },

  mounted() {
    this.$store.dispatch('localStorage/setState');

    if (
      this.auth.user.regions &&
      this.auth.user.regions.length &&
      !('regions' in this.urlGetParams)
    ) {
      //.keys().includes('court__region')) {
      this.$store.dispatch('localStorage/updateUrlParams', {
        regions: this.auth.user.regions,
      });
    }

    if (this.$route.query['p']) {
      this.$store
        .dispatch('getPresets', (res) => {
          console.log(res, 'WOOWCALLBACK');
        })
        .then(() => {
          const presetId = parseInt(this.$route.query['p']);
          const preset = this.presetsDict[presetId];
          this.$store.dispatch(
            'localStorage/replaceUrlGetParams',
            preset.get_params
          );
          this.$store.dispatch(
            'localStorage/replaceHumanFilterValues',
            preset.human_readable
          );

          Promise.all([
            this.$store.dispatch('localStorage/setActivePresetId', {
              id: presetId,
            }),
            this.$store.dispatch('localStorage/setActivePreset', {
              preset: preset,
            }),
            this.$store.dispatch('getCases'),
          ]).finally(() => {
            this.isLoading = false;
          });
        });
    } else if (this.$route.name == 'search') {
      this.$store.dispatch(
        'localStorage/replaceUrlGetParams',
        this.$route.query
      );
      Promise.all([this.$store.dispatch('getCases')]).finally(() => {
        this.isLoading = false;
        this.$store.dispatch('localStorage/clearParams');
      });
    } else if (this.$route.query['filters']) {
      this.$store
        .dispatch('getLink', {
          id: this.$route.query['filters'],
        })
        .then(() => {
          this.$store.dispatch(
            'localStorage/replaceUrlGetParams',
            this.currentLink.get_params
          );
          this.$store.dispatch(
            'localStorage/replaceHumanFilterValues',
            this.currentLink.human_readable
          );

          Promise.all([this.$store.dispatch('getCases')]).finally(() => {
            this.isLoading = false;
          });
        });
    } else if (this.activePresetId) {
      this.$store.dispatch('getPresets');

      const preset = this.presetsDict[this.activePresetId];

      this.$store.dispatch(
        'localStorage/replaceUrlGetParams',
        preset.get_params
      );
      this.$store.dispatch(
        'localStorage/replaceHumanFilterValues',
        preset.human_readable
      );

      if (this.$route.name == 'favorites') {
        this.$store.dispatch('localStorage/updateUrlParams', {
          in_favorites: true,
        });
      }
      Promise.all([this.$store.dispatch('getCases')]).finally(() => {
        this.isLoading = false;
      });
    } else {
      if (this.$route.name == 'index') {
        this.$store.dispatch('localStorage/updateUrlParams', {
          in_favorites: null,
        });
      } else if (this.$route.name == 'favorites') {
        this.$store.dispatch('localStorage/updateUrlParams', {
          in_favorites: true,
        });
      }
      this.$store.dispatch('localStorage/setState');
      Promise.all([
        this.$store.dispatch('getPresets'),
        this.$store.dispatch('getCases'),
      ]).finally(() => {
        this.isLoading = false;
      });
    }
  },

  methods: {
    ...mapActions(['updateUrlParams', 'getCases', 'local/increase']),

    showSizeChange(current, size) {
      this.$store.dispatch('showSizeChange', { current: current, size: size });
    },
    handleFav(e) {
      let caseId = parseInt(
        e.currentTarget.closest('tr').getAttribute('data-row-key')
      );
      let casesElem = this.cases.find((el) => el.id === caseId);

      let inFavorites = casesElem.in_favorites;
      let fav_cases = this.auth.user.favorite_cases;
      if (inFavorites) {
        fav_cases = fav_cases.filter((item) => item !== caseId);
      } else {
        fav_cases = [...this.auth.user.favorite_cases, caseId];
      }
      this.$store.dispatch('addToFavorites', { favorite_cases: fav_cases });

      casesElem.in_favorites = !inFavorites;
    },

    updateFilterValue(key, value) {
      let params = {};
      params[key] = value;
      this.$store.dispatch('localStorage/updateUrlParams', params);
    },

    handleChangePage(pValue, filters, sorter) {
      if (sorter.order && sorter.field) {
        let param = sorter.field;
        if (sorter.order == 'descend') {
          param = '-' + sorter.field;
        }

        if (this.$route.name == 'search') {
          this.$store.dispatch(
            'localStorage/replaceUrlGetParams',
            this.$route.query
          );
        }

        this.$store.dispatch('localStorage/updateUrlParams', {
          ordering: param,
        });
      }

      this.$store.dispatch('localStorage/updateUrlParams', {
        page: pValue.current,
      });

      this.loading = true;

      const yScrollShift =
        document.documentElement.scrollHeight - window.scrollY;

      Promise.all([
        this.$store.dispatch('getCases'),
        this.$store.dispatch('updatePaging', pValue),
      ]).finally(() => {
        this.loading = false;
        window.scrollTo(
          0,
          document.documentElement.scrollHeight - yScrollShift
        );
      });
    },
  },
};
</script>

<style>
.ant-table-placeholder {
  z-index: 0;
}

.no-result-text {
  display: none;
}

.result-text {
  opacity: 1;
}

.ant-table-pagination.ant-pagination {
  margin: 15px 55px;
}

.ant-table-body {
  overflow: auto;
}

.ant-table-tbody {
  font-size: 12px;
}

.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 18px;
}

@media (max-width: 768px) {
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 10px;
  }
}
</style>
