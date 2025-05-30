import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: string;
  onClick: () => void;
  className?: string;
}

function CategoryCard({ category, onClick, className }: CategoryCardProps) {
  return (
    <Card
      className={cn(
        'border-trust-blue/20 hover:border-trust-blue hover:bg-trust-blue/5 group cursor-pointer overflow-hidden border-l-4 transition-all duration-200 hover:scale-105 hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center p-6 text-center">
        <h3 className="text-foreground group-hover:text-trust-blue text-lg font-bold transition-colors">
          {category}
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">اضغط للاستعراض</p>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
