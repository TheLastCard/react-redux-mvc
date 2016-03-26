using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.Helpers
{
    public class CRUD<T> : ICRUD<T> where T : class
    {
        DbContext _db;
        DbSet<T> _set;
        public CRUD(DbContext db)
        {
            _db = db;
            _set = _db.Set<T>();
        }

        public void Add(T newEntity)
        {
            _set.Add(newEntity);
        }

        public void Delete(T entity)
        {
            _set.Remove(entity);
        }

        public IQueryable<T> FindAll()
        {
            return _set.AsQueryable();
        }

        public T FindById(int id)
        {
            return _set.Find(id);
        }

        public int Commit()
        {
            return _db.SaveChanges();
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
