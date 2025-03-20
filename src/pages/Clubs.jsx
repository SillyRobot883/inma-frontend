import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Users, Clock } from 'lucide-react';

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
      role: 'leader'
    },
    {
      id: 2,
      name: 'نادي الذكاء الاصطناعي',
      logo: '/src/assets/1-06.png',
      totalMembers: 30,
      totalHours: 200,
      role: 'member'
    },
    {
      id: 3,
      name: 'نادي ريادة الأعمال',
      logo: '/src/assets/1-06.png',
      totalMembers: 40,
      totalHours: 180,
      role: 'hr'
    }
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-kaff text-trust">الأندية</h1>
          {user.role === 'inma_admin' && (
            <button className="btn-primary">
              إضافة نادي جديد
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userClubs.map((club) => (
            <div
              key={club.id}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <img
                  className="h-16 w-16 rounded-xl"
                  src={club.logo}
                  alt={club.name}
                />
                <div>
                  <h3 className="text-lg font-kaff text-trust">
                    {club.name}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs mt-2 ${getRoleColor(club.role)}`}>
                    {getRoleLabel(club.role)}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="p-2 rounded-lg bg-growth/10">
                    <Users className="h-5 w-5 text-growth" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">عدد الأعضاء</p>
                    <p className="text-lg font-medium text-trust">
                      {club.totalMembers}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="p-2 rounded-lg bg-growth/10">
                    <Clock className="h-5 w-5 text-growth" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">إجمالي الساعات</p>
                    <p className="text-lg font-medium text-trust">
                      {club.totalHours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to={`/dashboard/${club.id}`}
                  className="btn-secondary w-full text-center"
                >
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