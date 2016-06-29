package de.fhws.applab.fiwmodules.database;

import de.fhws.applab.norbury.core.database.AbstractMySqlPersistency;
import de.fhws.applab.norbury.core.database.tables.AbstractTable;

import javax.inject.Singleton;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by braunpet on 27.07.15.
 */
@Singleton
public class Persistency extends AbstractMySqlPersistency
{
	public Persistency( )
	{
		super( );
	}

	@Override protected String getDatabaseName( )
	{
		return "STAGING";
	}

	@Override protected Set<AbstractTable> getAllTables( )
	{
		return new HashSet<>( );
	}
}
