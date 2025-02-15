import React from 'react';
import { Flex, Typography } from 'antd';

import { Lessons } from '../../api/lessons';
import { SelectWithAdd } from '../../elements/selectWithAdd/selectWithAdd';

const { Title } = Typography;

export function GroupHandler({ groups, setGroups, getLessons, setSelectedGroup, windowWidth }) {
  async function addOptions(value) {
    try {
      const { data: addedOption } = await Lessons.addGroup(value);

      setGroups((groups) => [...groups, ...addedOption])

      return addedOption;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex wrap={windowWidth < 450} style={{ alignItems: 'end', gap: 10 }}>
      <Title level={4}>{'Група:'}</Title>
      <SelectWithAdd
        setSelectedGroup={setSelectedGroup}
        options={groups.map(item => ({ value: item.id, label: item.name }))}
        style={{ marginBottom: 5 }}
        addOptions={addOptions}
        getLessonsList={getLessons}
      />
    </Flex>
  )
}