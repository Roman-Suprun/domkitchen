import { ChevronDown } from 'lucide-react';

import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';

const HomePage = async () => {
  return (
    <div className="mx-10 text-red-700 h-full-screen">
      Hello world!
      <Input endElement={<ChevronDown />} />
      <Button>Click me</Button>
    </div>
  );
};

export default HomePage;
