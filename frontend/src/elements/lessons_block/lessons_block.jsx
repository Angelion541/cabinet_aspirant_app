import React, { Fragment, useEffect, useState } from 'react';
import { Flex } from 'antd';

import { CardList } from '../cardList/cardList';

export function LessonsBlock({ lessons, children }) {
  const [firstWeekLessons, setFirstWeekLessons] = useState([]);
  const [secondWeekLessons, setSecondsWeekLessons] = useState([]);

  useEffect(() => {
    setFirstWeekLessons(lessons?.filter(value => value.week === '1') || []);
    setSecondsWeekLessons(lessons?.filter(value => value.week === '2') || []);
  }, [lessons]);

  return (
    <>
      {children}
      <Flex justify='space-evenly' style={{ margin: '20px 0' }}>
        <CardList
          suffix={'firstStudent'}
          title={'1 Тиждень'}
          lessonsList={firstWeekLessons}
        />
        <CardList
          suffix={'secondStudent'}
          title={'2 Тиждень'}
          lessonsList={secondWeekLessons}
        />
      </Flex>
    </>
  )
}