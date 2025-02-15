import React, { useEffect, useState } from 'react';

import { menuItems } from '../../../data/menuGlobal';
import { HeaderBlock } from '../../../elements/header/header_block';
import { Lessons } from '../../../api/lessons';
import { useUser } from '../../../providers/UserProvider';
import { LessonsBlock } from '../../../elements/lessons_block/lessons_block';
import { menuKeys } from '../../../data/menuKeys';

export const StudentCabinet = () => {
  const { user } = useUser();

  const [lessonsList, setLessonsList] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(menuKeys.schedule);

  useEffect(() => {
    async function fetchData() {
      const { data: lessons } = await Lessons.getLessons(user.group_id);

      setLessonsList(lessons);
    }

    fetchData();
  }, [user.group_id])


  return (
    <article>
      <HeaderBlock menuItems={menuItems} setCurrentMenu={setCurrentMenu} />

      {menuKeys.schedule === currentMenu && (
        <LessonsBlock lessons={lessonsList} />
      )}

      {menuKeys.tasks === currentMenu && (
        <div>
          <h1>Tasks</h1>
        </div>
      )}
    </article>
  )
}