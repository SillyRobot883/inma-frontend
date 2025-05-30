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
        'cursor-pointer overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center p-6 text-center">
        <h3 className="text-foreground text-lg font-bold">{category}</h3>
        <p className="text-muted-foreground mt-1 text-sm">اضغط للاستعراض</p>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
