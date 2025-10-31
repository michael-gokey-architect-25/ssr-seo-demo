// src/app/app.routes.spec.ts
import { routes } from './app.routes';
import { HelloComponent } from './components/hello/hello.component';
import { UserListComponent } from './components/user-list/user-list.component';


describe('App Routes', () => {
  it('should have 3 routes defined', () => {
    expect(routes.length).toBe(3);
  });

  describe('Root Route', () => {
    it('should redirect empty path to /hello', () => {
      const rootRoute = routes.find(r => r.path === '');
      expect(rootRoute).toBeDefined();
      expect(rootRoute?.redirectTo).toBe('/hello');
      expect(rootRoute?.pathMatch).toBe('full');
    });
  });

  describe('Hello Route', () => {
    it('should be defined', () => {
      const helloRoute = routes.find(r => r.path === 'hello');
      expect(helloRoute).toBeDefined();
    });

    it('should map to HelloComponent', () => {
      const helloRoute = routes.find(r => r.path === 'hello');
      expect(helloRoute?.component).toBe(HelloComponent);
    });
  });

  describe('Users Route', () => {
    it('should be defined', () => {
      const usersRoute = routes.find(r => r.path === 'users');
      expect(usersRoute).toBeDefined();
    });

    it('should map to UserListComponent', () => {
      const usersRoute = routes.find(r => r.path === 'users');
      expect(usersRoute?.component).toBe(UserListComponent);
    });
  });

  describe('Route Paths', () => {
    it('should have unique paths', () => {
      const paths = routes.map(r => r.path);
      const uniquePaths = new Set(paths);
      expect(paths.length).toBe(uniquePaths.size);
    });

    it('should not have undefined paths', () => {
      routes.forEach(route => {
        expect(route.path).toBeDefined();
      });
    });
  });
  
});
