using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace react_mvc.Helpers
{
    public interface ICRUD<T> : IDisposable
    {
        void Add(T newEntity, bool save);
        void Delete(T entity, bool save);
        T FindById(int id);
        T FindByName(string name);
        IEnumerable<T> FindAll();
        int Commit();
    }
}
