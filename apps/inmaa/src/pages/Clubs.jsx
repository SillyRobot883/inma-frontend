import { Link } from 'react-router-dom';

import { Clock, Users } from 'lucide-react';

import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Clubs = () => {
  const { user } = useAuth();

  // Dummy data for clubs
  const userClubs = [
    {
      id: 1,
      name: 'نادي البرمجة',
      logo: '/src/assets/1-06.png',
      totalMembers: 25,
      totalHours: 150,
      role: 'leader',
    },
    {
      id: 2,
      name: 'نادي الذكاء الاصطناعي',
      logo: '/src/assets/1-06.png',
      totalMembers: 30,
      totalHours: 200,
      role: 'member',
    },
    {
      id: 3,
      name: 'نادي ريادة الأعمال',
      logo: '/src/assets/1-06.png',
      totalMembers: 40,
      totalHours: 180,
      role: 'hr',
    },
  ];

  const getRoleLabel = (role) => {
    switch (role) {
      case 'leader':
        return 'قائد النادي';
      case 'hr':
        return 'موارد بشرية';
      case 'member':
        return 'عضو';
      default:
        return '';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'leader':
        return 'bg-trust text-white';
      case 'hr':
        return 'bg-growth text-white';
      case 'member':
        return 'bg-excellence text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-kaff text-trust text-2xl">الأندية</h1>
          {user.role === 'inma_admin' && <button className="btn-primary">إضافة نادي جديد</button>}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userClubs.map((club) => (
            <div key={club.id} className="card transition-shadow duration-200 hover:shadow-lg">
              <div className="flex items-center space-x-4 space-x-reverse">
                <img className="h-16 w-16 rounded-xl" src={club.logo} alt={club.name} />
                <div>
                  <h3 className="font-kaff text-trust text-lg">{club.name}</h3>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${getRoleColor(club.role)}`}
                  >
                    {getRoleLabel(club.role)}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="bg-growth/10 rounded-lg p-2">
                    <Users className="text-growth h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">عدد الأعضاء</p>
                    <p className="text-trust text-lg font-medium">{club.totalMembers}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="bg-growth/10 rounded-lg p-2">
                    <Clock className="text-growth h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">إجمالي الساعات</p>
                    <p className="text-trust text-lg font-medium">{club.totalHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link to={`/club/${club.id}`} className="btn-secondary w-full text-center">
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Clubs;
