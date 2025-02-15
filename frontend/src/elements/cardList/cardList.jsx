import { Card, Space } from 'antd';
import { CardTable } from '../cardTable/cardTable';
import { days } from '../../data/days';

export const CardList = ({ title, suffix, lessonsList }) => (
  <Space direction="vertical">
    <p style={{ textAlign: 'center' }}>{title}</p>
    {lessonsList.length > 0
      ? days.map((title) => {
        const filteredList = lessonsList?.filter(value => value.day === title) || [];

        return filteredList.length > 0 && <Card
          key={title + suffix}
          title={title}
          size="small"
          style={{
            width: '48vw',
          }}
        >
          <CardTable lessonsList={filteredList} />
        </Card>
      })
      : <p key={suffix}>{'Розклад відсутній'}</p>}
  </Space>
);