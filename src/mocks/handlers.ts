import { REST_PATH } from '@/settings/config';
import { faker } from '@faker-js/faker';
import { mergePath } from 'lesca-fetcher';
import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get(mergePath(REST_PATH.start), () => {
    return HttpResponse.json({
      isSuccess: 'success',
      result: [],
    });
  }),

  http.get(mergePath(REST_PATH.questions), () => {
    return HttpResponse.json({
      isSuccess: 'success',
      result: {
        tripList: [
          { trip: faker.string.uuid(), name: '蔚藍海岸' },
          { trip: faker.string.uuid(), name: '蓊鬱森林' },
          { trip: faker.string.uuid(), name: '花海平原' },
          { trip: faker.string.uuid(), name: '月夜雪地' },
          { trip: faker.string.uuid(), name: '金黃稻浪' },
        ],
        quizList: [
          { quizId: faker.string.ulid(), name: '探索世界' },
          { quizId: faker.string.ulid(), name: '財富自由' },
          { quizId: faker.string.ulid(), name: '職涯進階' },
          { quizId: faker.string.ulid(), name: '特殊體驗' },
          { quizId: faker.string.ulid(), name: '健康生活' },
          { quizId: faker.string.ulid(), name: '身心平衡' },
          { quizId: faker.string.ulid(), name: '挑戰極限' },
          { quizId: faker.string.ulid(), name: '開拓人際' },
          { quizId: faker.string.ulid(), name: '深度投資' },
          { quizId: faker.string.ulid(), name: '自我成長' },
        ],
        minerList: [],
      },
    });
  }),

  http.get('/img/favicon.ico', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api', () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Out Of Service',
    });
  }),
];
