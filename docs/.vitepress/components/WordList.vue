<template>
  <table v-if="wordList.length">
    <thead>
      <tr>
        <th>单词</th>
        <th>正确发音（英音）</th>
        <th>正确发音（美音）</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="([word, en, us], index) in wordList" :key="index">
        <td>{{ word }}</td>
        <td>
          <word-audio :word="word" :type="1">{{ en }} </word-audio>
        </td>
        <td>
          <word-audio :word="word"> {{ us }} </word-audio>
        </td>
        <td><a :href="`https://dict.youdao.com/result?word=${word}&lang=en`" target="_blank" class="link-clear">🔗</a></td>
      </tr>
    </tbody>
  </table>
  <span v-else>❌暂无单词</span>
</template>

<script setup lang="ts">
import WordAudio from './WordAudio.vue'
type IWord = string[]
const wordList: IWord[] = [
  ['access', "/'ækses/", '/ˈækses/'],
  ['Adobe', "/ə'dəʊbi/", "/ə'dəʊbi/"],
  ['admin', "/'ædmɪn/", '/ˈædmɪn/'],
  ['amazon', "/'æməzən/", '/ˈæməzɑːn/'],
  ['analogy', '/əˈnælədʒi/', '/əˈnælədʒi/'],
  ['Angular', "/'æŋgjʊlə/", '/ˈæŋɡjələr/'],
  ['AJAX', "/'eidʒæks/", "/'eidʒæks/"],
  ['alias', '/ˈeɪliəs/', '/ˈeɪliəs/'],
  ['align', '/əˈlaɪn/', '/əˈlaɪn/'],
  ['Apache', "/ə'pætʃɪ/", '/əˈpætʃi/'],
  ['app', '/æp/', '/æp/'],
  ['archive', "/'ɑːkaɪv/", "/'ɑːkaɪv/"],
  ['array', "/ə'rei/", '/əˈreɪ/'],
  ['ASCII', "/'æski/", '/ˈæski/'],
  ['aspect', "/'æspekt/", '/ˈæspekt/'],
  ['async', '/əˈsɪŋk/', '/æˈsɪŋk/'],
  ['avatar', "/'ævətɑː/", '/ˈævətɑːr/'],
  ['Azure', "/'æʒə/", '/ˈæʒər/'],
  ['bind', '/baɪnd/', '/baɪnd/'],
  ['BIOS', '/ˈbaɪɒs/', "/'baɪɑs/"],
  ['cache', '/kæʃ/', '/kæʃ/'],
  ['chrome', '/krəʊm/', '/kroʊm/'],
  ['context', '/ˈkɒntekst/', '/ ˈkɑːntekst/'],
  ['deny', "/dɪ'naɪ/", '/dɪˈnaɪ/'],
  ['deprecate', '/ˈdeprəkeɪt/', '/ˈdeprəkeɪt/'],
  ['deque', "/'dek/", '/dɛk/'],
  ['digest', "n. /'dɑɪdʒɛst/ v. /dɑɪ'dʒɛst/", '/daɪˈdʒest,dɪˈdʒest/'],
  ['doc', '/dɒk/', '/dɒk/'],
  ['dotnet', '/dɒtnet/', '/dɑːtnet/'],
  ['edition', '/ɪˈdɪʃ(ə)n/', '/ɪˈdɪʃn/'],
  ['execute', '/ˈeksɪkjuːt/', '/ˈeksɪkjuːt/'],
  ['executor', '/ɪɡˈzekjətə(r)/', '/ɪɡˈzekjətər/'],
  ['event', "/ɪ'vent/", '/ɪˈvent/'],
  ['exit', '/ˈeksɪt/', '/ˈeksɪt; ˈeɡzɪt/'],
  ['format', "/'fɔːmæt/", '/ˈfɔːrmæt/'],
  ['gauge', '/ɡeɪdʒ/', '/ɡeɪdʒ/'],
  ['Git', '/ɡɪt/', '/ɡɪt/'],
  ['GraphQL', '/græf kju ɛl/', '/græf kju ɛl/'],
  ['GUI', '/ˈɡu:i/', '/ˈɡu:i/'],
  ['height', '/haɪt/', '/haɪt/'],
  ['hidden', "/'hɪdn/", '/ˈhɪdn/'],
  ['image', "/'ɪmɪdʒ/", '/ˈɪmɪdʒ/'],
  ['implement', "/'ɪmplɪm(ə)nt/", '/ˈɪmplɪmənt/ /ˈɪmpləˌment/'],
  ['integer', "/'ɪntɪdʒə/", '/ˈɪntɪdʒər/'],
  ['issue', "/'ɪʃuː/", '/ˈɪʃuː/'],
  ['Java', "/'dʒɑːvə/", '/ˈdʒɑːvə/'],
  ['jpg', "/'dʒeɪpeɡ/", "/'dʒeɪpeɡ/"],
  ['key', '/kiː/', '/kiː/'],
  ['legacy', "/'leɡəsi/", "/'leɡəsi/"],
  ['linear', "/'lɪnɪə/", '/ˈlɪniər/'],
  ['Linux', "/'lɪnəks/", '/ˈlaɪnəks/ /ˈlɪnəks/'],
  ['locale', "/ləʊ'kɑːl/", '/loʊˈkæl/'],
  ['macro', '/ˈmækrəʊ/', '/ˈmækroʊ/'],
  ['main', '/meɪn/', '/meɪn/'],
  ['margin', "/'mɑːdʒɪn/", '/ˈmɑːrdʒɪn/'],
  ['matrix', '/ˈmeɪtrɪks/', '/ˈmeɪtrɪks/'],
  ['max', '/mæks/', '/mæks/'],
  ['Microsoft', "/'maikrəusɔft/", '/ˈmaɪkrəsɔːft/'],
  ['module', "/'mɒdjuːl/", '/ˈmɑːdʒuːl/'],
  ['native', '/ˈneɪtɪv/', '/ˈneɪtɪv/'],
  ['nginx', 'Engine X', 'Engine X'],
  ['null', '/nʌl/', '/nʌl/'],
  ['obsolete', '/ˈɒbsəliːt/', '/ˌɑːbsəˈliːt/'],
  ['parameter', "/pə'ræmɪtə/", '/pəˈræmɪtər/'],
  ['privilege', "/'prɪvəlɪdʒ/", '/ˈprɪvəlɪdʒ/'],
  ['probe', '/prəʊb/', '/proʊb/'],
  ['Qt', '/kjuːt/', '/kjuːt/'],
  ['query', "/'kwɪəri/", '/ˈkwɪri/'],
  ['reconcile', '/ˈrekənsaɪl/', '/ˈrekənsaɪl/'],
  ['Redux', "/ri'dʌks/", "/ri'dʌks/"],
  ['resume', "/rɪ'zju:m/", '/rɪˈzuːm/'],
  ['resolved', "/rɪ'zɒlvd/", '/rɪˈzɑːlvd/'],
  ['resort', '/rɪˈzɔ:t/', '/rɪˈzɔːrt/'],
  ['route', '/ruːt/', '/ruːt,raʊt/'],
  ['safari', "/sə'fɑːrɪ/", '/səˈfɑːri/'],
  ['scheme', '/skiːm/', '/skiːm/'],
  ['scala', '/ˈskɑːlɑ/', '/ˈskɑːlɑ/'],
  ['SQL', '/ˈsiːkwəl/ /ˈesˈkjuːˈel/', '/ˈsiːkwəl/ /ˈesˈkjuːˈel/'],
  ['sudo', "/'suːduː/", "/'suːduː/"],
  ['suite', '/swiːt/', '/swiːt/'],
  ['tuple', '/tjʊpəl/', '/tuːpəl/'],
  ['typical', "/'tɪpɪkl/", '/ˈtɪpɪkl/'],
  ['Ubuntu', "/ʊ'bʊntʊ/", "/ʊ'bʊntʊ/"],
  ['variable', "/'veəriəbl/", '/ˈveriəbl,ˈværiəbl/'],
  ['verbose', '/vɜːˈbəʊs/', '/vɜːrˈboʊs/'],
  ['vue', "/v'ju:/", "/v'ju:/"],
  ['width', '/wɪdθ/', '/wɪdθ,wɪtθ/'],
  ['YouTube', "/'juː'tjuːb/", "/'juː'tjuːb/"],
  ['Vite', '/vit/', '/vit/'],
  ['ref'],
  ['attrs'],
  ['listeners'],
  ['provide'],
  ['inject'],
  ['vuex'],
  ['emits'],
  ['Unmount'],
  ['Maximum']
]
</script>

<style lang="scss" scoped>
.link-clear {
  &:hover {
    text-decoration: none;
  }
}
</style>
