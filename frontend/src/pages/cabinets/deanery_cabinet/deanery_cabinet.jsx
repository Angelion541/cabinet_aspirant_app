import React, { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';

import { Lessons } from '../../../api/lessons';
import { menuItems } from '../../../data/menuGlobal';
import { menuKeys } from '../../../data/menuKeys';
import { getStudentGroups } from '../../../helpers/getStudentGroups';
import { HeaderBlock } from '../../../elements/header/header_block';
import { LessonsBlock } from '../../../elements/lessons_block/lessons_block';
import { GroupHandler } from '../../../elements/group_handler/group_handler';
import { AddLessonModal } from '../../../elements/addLesson/addLesson';
import { TasksBlock } from '../../../elements/tasksBlock/tasksBlock';
import { StudentHandler } from '../../../elements/studentHandler/studentHandler';

export const DeaneryCabinet = () => {
  const [dicts, setDicts] = useState({});
  const [localGroups, setLocalGroups] = useState([]);
  const [lessonsList, setLessonsList] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(menuKeys.schedule);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    getStudentGroups(setDicts, setLocalGroups);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // При демонтажі компонента видаляємо слухач
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  async function getLessons(group) {
    try {
      const { data: lessonsData } = await Lessons.getLessons(group);

      setLessonsList(lessonsData);
    } catch (error) {
      console.log(error)
    }
  }

  async function addLesson() {
    getLessons(selectedGroup.value);
  }

  function isMenuCurrent(menu) {
    return currentMenu === menuKeys[menu];
  }

  return (
    <article>
      <HeaderBlock menuItems={menuItems} setCurrentMenu={setCurrentMenu} />

      {isMenuCurrent('schedule') && (
        <LessonsBlock lessons={lessonsList} >
          <Flex wrap style={{ marginLeft: 20, alignItems: 'end' }}>
            <GroupHandler
              windowWidth={windowWidth}
              groups={localGroups}
              setGroups={setLocalGroups}
              getLessons={getLessons}
              setSelectedGroup={setSelectedGroup}
            />

            <AddLessonModal
              selectedGroup={selectedGroup}
              getLessons={getLessons}
              dicts={dicts}
              addLesson={addLesson}
            />
          </Flex>
        </LessonsBlock>
      )}

      {isMenuCurrent('tasks') && (
        <TasksBlock>
          <Flex wrap style={{ marginLeft: 20, alignItems: 'end', gap: 20 }}>
            <GroupHandler
              windowWidth={windowWidth}
              groups={localGroups}
              setGroups={setLocalGroups}
              getLessons={getLessons}
              setSelectedGroup={setSelectedGroup}
            />

            <StudentHandler windowWidth={windowWidth} />

            <Button type='default' style={{ margin: '5px 10px', alignSelf: 'end' }}>{'Додати завдання'}</Button>
          </Flex>
        </TasksBlock>
      )}
    </article>
  )
}