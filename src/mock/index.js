import Mock from 'mockjs'

const Random = Mock.Random

Mock.mock(RegExp('/api/articles'), 'get', {
  code: 200,
  data:  {
    'rows|20' : [{
      id: '@id',
      title: "@title",
      titleIcon: Random.image('24x24'),
      content: '@paragraph(50)',
      date: '@date',
      contentImg: Random.dataImage(),
      videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    }],
    pagination: {
      pageSize: 20,
      total: 200
    }
  }
})

Mock.mock(RegExp('/api/article'), 'get', {
  code: 200,
  data: {
    id: '@id',
    title: "@title",
    titleIcon: Random.image('24x24'),
    content: '@paragraph(50)',
    date: '@date',
    contentImg: Random.dataImage(),
    videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  },
})

Mock.mock(RegExp('/search/suggestion'), 'get', {
  code: 200,
  "data|1-20": ["@cname"]
})
