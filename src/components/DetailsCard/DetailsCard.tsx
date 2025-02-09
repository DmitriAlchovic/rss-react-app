import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getOne } from '../../api/monsters';
import { MonsterInfo } from '../../interfaces';
import { API_URL } from '../../constants';
import Loader from '../../pages/Home/components/Loader/Loader';
import './DetailsCard.css';

const DetailsCard: FC = () => {
  const { monsterId } = useParams();
  const [monsterInfo, setMonsterInfo] = useState<MonsterInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMonster(monsterId);
  }, [monsterId]);

  const fetchMonster = async (monsterId: string | undefined) => {
    setLoading(true);
    if (monsterId) {
      const data = await getOne(monsterId);
      if (data) {
        setMonsterInfo(data);
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    const path = location.pathname.split('/');
    path.pop();
    const newPath = path.join('/');
    navigate(newPath);
  };
  return (
    <>
      <div>
        <div className="card-container">
          <h2>Details</h2>
          {loading && <Loader />}
          {monsterInfo && !loading && (
            <div className="info-container">
              <h2>{monsterInfo.name}</h2>
              <button className="close-button" onClick={handleClose}>
                x
              </button>
              <h3>
                Strength:{monsterInfo.strength} Constitution:
                {monsterInfo.constitution} Dexterity:{monsterInfo.dexterity}{' '}
                Intelligence:{monsterInfo.intelligence} Wisdom:
                {monsterInfo.wisdom} Charisma:{monsterInfo.charisma}
              </h3>
              <img
                className="card-img"
                src={API_URL + monsterInfo.image}
                alt="No img"
              ></img>
              <p>
                Alignment: {monsterInfo.alignment} Languages:{' '}
                {monsterInfo.languages}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsCard;
